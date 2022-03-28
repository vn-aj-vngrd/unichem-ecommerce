import MUIDataTable from "mui-datatables";

const DataTable = ( {title, data, columns} ) => {
  const options = {
    filterType: "checkbox",
  };
  return (
    <div>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DataTable;
