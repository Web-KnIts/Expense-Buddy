
interface iDeleteAlertProps{
    content:string;
    onDelete:()=>void;
}
const DeleteAlert : React.FC<iDeleteAlertProps> = ({content,onDelete}) => {
  return (
    <div>
        <p className="text-sm">{content}</p>
        <div className="flex justify-end mt-6">
            <button type="button" className="add-btn add-btn-fill" onClick={onDelete}>
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert