import BasicModal from '../common/BasicModal/BasicModal';
import Axios from 'axios';
import { ChangeEvent, useState } from 'react';

import axios from '../../../interceptors/axios';

interface IProps {
  open: boolean;
  onClose: () => void;
  lectureId: string | undefined;
  userEmail: string | undefined;
}

const NewWorkModal = ({ open, onClose, lectureId, userEmail }: IProps) => {
  const [file, setFile] = useState<string | Blob>();

  const handleChange = (file: ChangeEvent) => {
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (!file) {
      alert('Please select the file first!');
      return;
    }
    formData.append('file', file);
    formData.append('upload_preset', 'elearning_preset');
    formData.append('cloud_name', 'dp9h6rkbl');

    Axios.post(
      'https://api.cloudinary.com/v1_1/dp9h6rkbl/auto/upload',
      formData
    ).then((res) => {
      // console.log(res.data);
      const filename = `${res.data.original_filename}.${res.data.format}`;
      const fileUrl = res.data.url;

      console.log('FileName: ', filename);
      console.log('FileURL: ', fileUrl);
      axios
        .post('work/create', {
          filename: filename,
          filepath: fileUrl,
          owner: userEmail,
        })
        .then((res) => {
          console.log('FILE CREATED -> ', res.data);
          axios
            .patch(`lectures/${res.data._id}/add-work/${lectureId}`)
            .then((res) => console.log('Add work to lecture'));
        })
        .catch((error) => console.log('ERROR', error));
    });
  };

  const getContent = () => (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" onChange={handleChange} />
      </form>
    </>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Add Work"
      subTitle="Add new work to the lecture"
      content={getContent()}
      onSubmit={handleSubmit}
    ></BasicModal>
  );
};

export default NewWorkModal;
