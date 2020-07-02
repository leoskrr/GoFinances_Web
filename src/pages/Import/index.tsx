import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  function handleUpload(): void {
    const data = new FormData();

    if (!uploadedFiles.length) return;

    uploadedFiles.forEach(async file => {
      data.append('file', file.file, file.name);
      try {
        await api.post('/transactions/import', data);

        history.push('/');
      } catch (err) {
        console.log(err.response.error);
      }
      data.delete('file');
    });
  }

  function submitFile(files: File[]): void {
    // TODO
    const userFiles: FileProps[] = files.map(userFile => ({
      file: userFile,
      name: userFile.name,
      readableSize: filesize(userFile.size),
    }));
    setUploadedFiles(userFiles);
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
