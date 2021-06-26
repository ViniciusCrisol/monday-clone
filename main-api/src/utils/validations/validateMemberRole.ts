import memberRoles from '@utils/enums/memberRoles';

export default RegExp(
  String(
    '(' + Object.keys(memberRoles).map(memberRole => memberRole) + ')',
  ).replace(/,/g, '|'),
);
