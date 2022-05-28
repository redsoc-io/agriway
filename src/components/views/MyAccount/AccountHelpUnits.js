function Accounthelp({ url, help, icon, size }) {
  return (
    <a
      className={`px-2 py-5 block bg-gray-100 m-2 ${size} flex items-center flex-col rounded-lg`}
      href={url}
    >
      <div className=" text-7xl text-gray-600">{icon}</div>
      <h4 className="py-1 text-gray-800">{help}</h4>
    </a>
  );
}
export default Accounthelp;
