import Reactable from 'reactable';
import _Table from './Table';
import _Expandable from './Expandable';

export const Table = _Table;
export const Expandable = _Expandable;
export const Sort = Reactable.Sort;
export const Td = Reactable.Td;
export const Tfoot = Reactable.Tfoot;
export const Thead = Reactable.Thead;
export const Tr = Reactable.Tr;
export const Th = Reactable.Th;

Table.Expandable = Expandable;
Table.Sort = Sort;
Table.Td = Td;
Table.Tfoot = Tfoot;
Table.Thead = Thead;
Table.Tr = Tr;
Table.Th = Th;

export default Table;
