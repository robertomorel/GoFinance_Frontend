import React, { ReactNode } from 'react';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onUpload: Function;
}

const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
  /**
   * Função para alterar o texto dependendo da ação do usuário.
   * Também depende da validação do arquivo.
   *
   * @param isDragActive
   * @param isDragRejest
   */
  function renderDragMessage(
    isDragActive: boolean,
    isDragRejest: boolean,
  ): ReactNode {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragRejest) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    /**
     * DropZone -> Biblioteca do (react-dropzone) para zona de upload.
     *             O box para arrastar os arquivos para dentro.
     *    accept: Tipo de arquivo permitido no DropZone. Nesse caso: "text/csv"
     *    onDropAccepted: É chamada toda vez que o usuário fizer um upload
     *
     * { getRootProps, getInputProps, isDragActive, isDragReject } são variáveis desestruturadas do DropZone
     *
     * Uso da "...getRootProps()" -> Faz com que todas estas propriedades do DropZone vá para o DropContainer
     * Uso da "isDragActive={isDragActive}" -> informação ao DropContainer
     *     - Quando o usu está com um arquivo válido com o mouse passando por cima da zone
     * Uso da "isDragReject={isDragReject}" -> informação ao DropContainer
     *     - Quando o usu está com um arquivo inválido com o mouse passando por cima da zone
     * Uso da "...getInputProps()" -> Faz com que todas estas propriedades do DropZone vá para o input
     */

    /**
     * Atenção!!!
     *   No windows, a propriedade accept deve ficar com "application/vnd.ms-excel".
     *   Também mudar no último teste unitário.
     *   Valor liberado: "text/csv"
     */

    <>
      <Dropzone accept="text/csv" onDropAccepted={files => onUpload(files)}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} data-testid="upload" />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </>
  );
};

export default Upload;
