import MUIDataTable from "mui-datatables";

const DataTable = ({ title, data, columns, options }) => {
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
