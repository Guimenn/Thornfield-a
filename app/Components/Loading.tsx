'use client';
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
        <div className="mt-8 text-amber-400 text-xl font-light">
          Carregando
        </div>
      </div>
    </div>
  );
};

export default Loading; 