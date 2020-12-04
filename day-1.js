// --- Part One ---

// After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.

// The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.

// To save your vacation, you need to get all fifty stars by December 25th.

// Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

// Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

// Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

// For example, suppose your expense report contained the following:

// 1721
// 979
// 366
// 299
// 675
// 1456
// In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

// Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?

// --- Part Two ---
// The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

// Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

// In your expense report, what is the product of the three entries that sum to 2020?

const numbers = [
  '',
  '1778',
  '1845',
  '1813',
  '1889',
  '1939',
  '1635',
  '1443',
  '796',
  '1799',
  '938',
  '1488',
  '1922',
  '1909',
  '1258',
  '1659',
  '1959',
  '1557',
  '1085',
  '1379',
  '1174',
  '1782',
  '1482',
  '1702',
  '1180',
  '1992',
  '1815',
  '1802',
  '215',
  '1649',
  '782',
  '1847',
  '1673',
  '1823',
  '1836',
  '1447',
  '1603',
  '1767',
  '1891',
  '1964',
  '1881',
  '1637',
  '1229',
  '1994',
  '1901',
  '1583',
  '1918',
  '1415',
  '1666',
  '1155',
  '1446',
  '1315',
  '1345',
  '1948',
  '1427',
  '1242',
  '1088',
  '807',
  '1747',
  '1514',
  '1351',
  '1791',
  '1612',
  '1550',
  '1926',
  '1455',
  '85',
  '1594',
  '1965',
  '1884',
  '1677',
  '1960',
  '1631',
  '1585',
  '1472',
  '1263',
  '1566',
  '1998',
  '1698',
  '1968',
  '1927',
  '1378',
  '1346',
  '1710',
  '1921',
  '1827',
  '1869',
  '1187',
  '1985',
  '1323',
  '1225',
  '1474',
  '1179',
  '1580',
  '1098',
  '1737',
  '1483',
  '1665',
  '1445',
  '1979',
  '1754',
  '1854',
  '1897',
  '1405',
  '1912',
  '1614',
  '1390',
  '1773',
  '1493',
  '1333',
  '1758',
  '1867',
  '1586',
  '1347',
  '1723',
  '1285',
  '394',
  '1743',
  '1252',
  '320',
  '1547',
  '1804',
  '1899',
  '1526',
  '1739',
  '1533',
  '1938',
  '1081',
  '1465',
  '1920',
  '1265',
  '1470',
  '1792',
  '1118',
  '1842',
  '1204',
  '1760',
  '1663',
  '893',
  '1853',
  '1244',
  '1256',
  '1428',
  '1334',
  '1967',
  '1249',
  '1752',
  '1124',
  '1725',
  '1949',
  '1340',
  '1205',
  '1584',
  '548',
  '1947',
  '2002',
  '1993',
  '1931',
  '1236',
  '1154',
  '1572',
  '1650',
  '1678',
  '1944',
  '1868',
  '1129',
  '1911',
  '1106',
  '1900',
  '1240',
  '1955',
  '1219',
  '1893',
  '1459',
  '1556',
  '1173',
  '1924',
  '1568',
  '1950',
  '1303',
  '1886',
  '1365',
  '1402',
  '1711',
  '1706',
  '1671',
  '1866',
  '1403',
  '1816',
  '1717',
  '1674',
  '1487',
  '1840',
  '1951',
  '1255',
  '1786',
  '1111',
  '1280',
  '1625',
  '1478',
  '1453'
];

// we can optimize

// --- Part One ---
numbers.forEach(number => {
  numbers.forEach(number2 => {
    if (parseInt(number) + parseInt(number2) === 2020) {
      console.log(parseInt(number) * parseInt(number2));
    }
  });
});
// --- Part Two ---

numbers.forEach(number => {
  numbers.forEach(number2 => {
    numbers.forEach(number3 => {
      if (parseInt(number) + parseInt(number2) + parseInt(number3) === 2020) {
        console.log(parseInt(number) * parseInt(number2) * parseInt(number3));
      }
    });
  });
});
