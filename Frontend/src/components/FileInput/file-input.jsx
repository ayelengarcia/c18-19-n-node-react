import React, { useRef } from 'react';
import Icon from './path/to/icon.svg';
import IconPlus from './path/to/iconPlus.svg';
import './fileInput.module.css';

const FileInput = () => {
  const inputFile = useRef(null);

  return (
    <>
      <input type="file" ref={inputFile} className="hidden" />

      <div
        className="flex flex-row items-center gap-2 mt-2"
        onClick={() => {
          inputFile.current.click();
        }}
      >
        <div className="box-border border-solid rounded-full border-gray border-2">
          <img src={Icon} alt="Icono de subida de imagen" className="p-3 cursor-pointer" />
        </div>
        <img
          src={IconPlus}
          alt="Icono de subida de imagen (plus)"
          className="absolute inline-flex justify-center translate-x-[260%] -translate-y-[80%]"
        />
        <p className="font-medium text-base text-black cursor-pointer"> Subí tu foto de perfil </p>
      </div>
    </>
  );
};

export default FileInput;
