import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { uniqueId } from 'lodash';

import filesize from 'filesize';

// import { isRegExp } from 'util';
import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';
// import { formatDate } from '../../utils/formatValue';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}
/*
interface FileProps {
  file: File;
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string;
}
*/

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  /*
  function updateFile(id: string, data: {}): void {
    setUploadedFiles(
      uploadedFiles.map(uploadedFile => {
        return uploadedFile.id === id
          ? { ...uploadedFiles, ...data }
          : uploadedFile;
      }) as FileProps[],
    );
  }
  */

  /*
  async function sendRequisitions(uploadedFile: FileProps): Promise<void> {
    // -- FormData é um submit de um form HTML em JS.
    const data = new FormData();
    data.append('file', uploadedFile.file, uploadedFile.name);

    api
      .post('/transactions/import', data)
      .then(response => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          // eslint-disable-next-line no-underscore-dangle
          id: response.data._id,
        });
      })
      .catch(err => {
        updateFile(uploadedFile.id, {
          error: true,
        });
      });
  }
  */

  /*
  async function handleUpload(): Promise<void> {
    uploadedFiles.forEach(async file => {
      await sendRequisitions(file);
    });
    history.push('/');
  }
  */

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    try {
      uploadedFiles.forEach(file => {
        data.append('file', file.file);
      });
      await api.post('/transactions/import', data);

      history.goBack();
    } catch (err) {
      console.log(err.response.error);
    }
  }

  /*
  function submitFile(files: File[]): void {
    const newUploadedFiles: FileProps[] = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: '',
    }));

    setUploadedFiles(uploadedFiles.concat(newUploadedFiles));
  }
  */
  function submitFile(files: File[]): void {
    const newUploadedFiles: FileProps[] = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));
    setUploadedFiles(uploadedFiles.concat(newUploadedFiles));
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
