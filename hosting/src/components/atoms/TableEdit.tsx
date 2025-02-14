import { Button } from './Button';

interface TableEditProps {
  isEdit?: boolean;
  editUrl?: string;
  onClickEdit?: () => void;
  isDelete?: boolean;
  onClickDelete?: () => void;
}
export const TableEdit = ({
  isEdit,
  isDelete,
  onClickEdit,
  onClickDelete,
}: TableEditProps) => {
  return (
    <div className='flex space-x-2 items-end justify-end'>
      {isEdit && (
        <Button type='button' onClick={onClickEdit}>
          Edit
        </Button>
      )}
      {isDelete && (
        <Button type='button' onClick={onClickDelete}>
          Delete
        </Button>
      )}
    </div>
  );
};
