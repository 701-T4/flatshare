import { Button, Modal } from '@nextui-org/react';
import React, { useRef } from 'react';

interface AnnouncementModalFormProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveAnnouncement: (title: string, detail: string) => void;
}

const AnnouncementModalForm: React.FC<AnnouncementModalFormProps> = (props) => {
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
      >
        <Modal.Header>
          <span
            className="w-full text-2xl font-bold text-left hover:text-gray-500 focus:text-black outline-none"
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
              className="block hover:text-gray-500 h-[50vh] focus:text-black outline-none"
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
            <Button onClick={handlePublish}>Publish</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AnnouncementModalForm;
