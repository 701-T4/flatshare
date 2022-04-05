import { Button, Modal } from '@nextui-org/react';
import React, { useRef } from 'react';

interface AnnouncementModalFormProps {
  visible: boolean; // visibility of the modal
  setVisible: React.Dispatch<React.SetStateAction<boolean>>; // hook to set visibility of modal
  onSaveAnnouncement: (title: string, detail: string) => void; // api hook for new announcement post request
}

/**
 * AnnouncementModalForm is a modal form displayed when user tries to create a new announcement.
 * The component does not manage its visibility itself, but instead takes visibility state from parent compnoent as a prop.
 * An api hook can be passed in for invocation when publish button is pressed.
 *
 * @param props Refer to AnnouncementModalFormProps
 */
const AnnouncementModalForm: React.FC<AnnouncementModalFormProps> = (props) => {
  /**
   * refs will be embedded to title and details span so that their text contents are retrievable
   */
  const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const detailRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handlePublish = () => {
    props.onSaveAnnouncement(
      titleRef.current.textContent || '',
      detailRef.current.textContent || '',
    );
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        scroll
        closeButton
        open={props.visible}
        onClose={() => props.setVisible(false)}
        width={'70%'}
        className="px-3 pb-6 sm:px-8 pt-14"
      >
        <Modal.Header>
          <span
            className="w-full text-2xl font-bold text-left outline-none hover:text-gray-500 focus:text-black"
            contentEditable={true}
            suppressContentEditableWarning={true}
            ref={titleRef}
          >
            Enter a title for your announcement
          </span>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span
              className="block hover:text-gray-500 h-[20vh] sm:h-[50vh] focus:text-black outline-none"
              suppressContentEditableWarning={true}
              contentEditable={true}
              ref={detailRef}
            >
              Details
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end">
            <Button auto className="rounded-lg px-7" onClick={handlePublish}>
              Publish!
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AnnouncementModalForm;
