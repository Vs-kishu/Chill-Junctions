const Loader = ({ w, h }: { w: number; h: number }) => (
  <div className="flex-center w-full">
    <img
      src="/assets/loader.svg"
      alt="loader"
      width={w}
      height={h}
      className="animate-spin"
    />
  </div>
);

export default Loader;
