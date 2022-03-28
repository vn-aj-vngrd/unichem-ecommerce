import MUIDataTable from "mui-datatables";

const DataTable = ( {data, columns} ) => {


  const options = {
    filterType: "checkbox",
  };
  return (
    <div>
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DataTable;
