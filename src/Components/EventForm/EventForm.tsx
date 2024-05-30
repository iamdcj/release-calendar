import Modal from "react-modal";
import "./styles.css";

function EventForm({
  event,
  closeHandler,
  confirmEvent,
}: {
  event: any;
  closeHandler: any;
  confirmEvent: any;
}) {
  const onSubmit = () => {
    confirmEvent(event);
  };


  return (
    <Modal isOpen={event} contentLabel="Example Modal" 
    className="content" 
    overlayClassName="wrapper">
      <button onClick={() => closeHandler(null)}>close</button>
      <div>I am a modal</div>
      <form style={{}} onSubmit={onSubmit}>
        {JSON.stringify(event)}
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}

export default EventForm;
