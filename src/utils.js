import { CURRENT_DATE } from './AppConstants.js';
import { parse } from 'date-fns';

const parseDate = (dateString) => {
    // Add more formats as needed
    const possibleFormats = [
        'yyyy-MM-dd',
        'dd/MM/yyyy',
        'MM-dd-yyyy',
        'dd.MM.yy',
        'MM.dd.yy',
    ];

    let parsedDate = null;

    for (const format of possibleFormats) {
        parsedDate = parse(dateString, format, new Date());
        if (!isNaN(parsedDate)) {
            break;
        }
    }
    return parsedDate;
};

const formatDate = (dateStr) => {
    if (dateStr === 'NULL') {
        return CURRENT_DATE;
    }

    return parseDate(dateStr);
};

export const groupByProjectId = (result, groupedByProject) => {
    // Input data format shouldn't change - each row/result should have the same cell order
    const employeeId = result[0];
    const projectId = result[1];
    const dateFrom = formatDate(result[2]);
    const dateTo = formatDate(result[3]);

    if (!groupedByProject[projectId]) {
        groupedByProject[projectId] = [
            {
                employeeId,
                dateFrom,
                dateTo,
            },
        ];
    } else {
        groupedByProject[projectId].push({
            employeeId,
            dateFrom,
            dateTo,
        });
    }
};

const calculateTotalDays = (dateFrom1, dateTo1, dateFrom2, dateTo2) => {
    if (dateFrom1 > dateTo2 || dateFrom2 > dateTo1) {
        return 0;
    }

    const overlapStart = dateFrom1 > dateFrom2 ? dateFrom1 : dateFrom2;
    const overlapEnd = dateTo1 < dateTo2 ? dateTo1 : dateTo2;
    const overlapDays = (overlapEnd - overlapStart) / (1000 * 60 * 60 * 24) + 1;

    return overlapDays;
};

const getOverlappingDaysForPair = (employees, employeeId1, employeeId2) => {
    let dateFrom1, dateTo1, dateFrom2, dateTo2;
    return employees.reduce((totalDays, employee) => {
        if (employee.employeeId === employeeId1) {
            dateFrom1 = employee.dateFrom;
            dateTo1 = employee.dateTo;
        }
        if (employee.employeeId === employeeId2) {
            dateFrom2 = employee.dateFrom;
            dateTo2 = employee.dateTo;
        }
        if (dateFrom1 && dateFrom2) {
            return (
                totalDays +
                calculateTotalDays(dateFrom1, dateTo1, dateFrom2, dateTo2)
            );
        }
        return totalDays;
    }, 0);
};

export const generateEmployeePairs = (groupedByProject) => {
    const combinations = [];
    for (const projectId in groupedByProject) {
        const employeesData = groupedByProject[projectId];
        const empIds = employeesData.map((employee) => employee.employeeId);

        empIds.forEach((employeeId1, index, arr) => {
            arr.slice(index + 1).forEach((employeeId2) => {
                const days = getOverlappingDaysForPair(
                    employeesData,
                    employeeId1,
                    employeeId2
                );
                combinations.push({
                    employeeIds: [employeeId1, employeeId2],
                    projectId,
                    overlappingDays: days,
                });
            });
        });
    }

    return combinations.sort((a, b) => b.overlappingDays - a.overlappingDays);
};
