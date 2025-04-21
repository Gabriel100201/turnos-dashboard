type dataTable = Array<{ [key: string]: string | number | boolean | React.ReactNode | null }>

interface TableComponentProps {
  title?: string;
  columns: string[];
  clickable?: boolean;
  data: dataTable;
  onRowClick?: (row: T) => void;
  placeHolder?: string;
  selectedCategoria?: number | null;
};

export { TableComponentProps };