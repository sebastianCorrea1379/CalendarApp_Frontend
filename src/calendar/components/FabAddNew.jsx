import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';


export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '', //Este es obligatorio
            notes: '',
            start: new Date(), //Este es obligatorio
            end: addHours(new Date(), 2), //Estamos sumando dos horas. Este es obligatorio
            bgColor: '#fafafa',
            user: {
            _id: '123',
            name: 'Sebastian'
            }
        });
        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
