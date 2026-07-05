import { FiEdit3 } from "react-icons/fi";
import EntityFormPage from "../../components/EntityFormPage";

const fields = [
  { name: "name", label: "Customer name", placeholder: "Enter customer name", required: true, fullWidth: true },
  { name: "email", label: "Email address", type: "email", placeholder: "customer@example.com", required: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Enter phone number" },
  { name: "address", label: "Address", type: "textarea", placeholder: "Enter customer address", fullWidth: true },
];

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const UpdateCustomer = () => (
  <EntityFormPage
    mode="update"
    entityName="Customer"
    endpoint="/api/customers/update"
    listPath="/customers"
    fields={fields}
    initialValues={initialValues}
    icon={FiEdit3}
    summaryTitle="Customer preview"
    summaryDescription="Update customer details used by sales and account records."
    previewFields={[
      { name: "name", label: "Name", emptyText: "Customer name" },
      { name: "email", label: "Email", emptyText: "Email address" },
      { name: "phone", label: "Phone", emptyText: "Phone number" },
    ]}
    helpText="Changes here affect how customer records appear across sales screens."
  />
);

export default UpdateCustomer;
