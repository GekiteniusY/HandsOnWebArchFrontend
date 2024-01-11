interface RenderType {
  // children: React.ReactNode;
  renderType: string;
}

const CmpRenderType: React.FC<RenderType> = ({ renderType }) => {
  return (
    <>
      <p className='mb-3 text-blue-500'>{renderType}</p>
    </>
  );
};

export default CmpRenderType;
