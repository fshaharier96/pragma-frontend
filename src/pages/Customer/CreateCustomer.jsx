import { FiUserPlus } from "react-icons/fi";
import EntityFormPage from "../../components/EntityFormPage";

const fields = [
  { name: "name", label: "Customer name", placeholder: "Enter customer name", required: true, fullWidth: true },
  { name: "email", label: "Email address", type: "email", placeholder: "customer@example.com", required: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Enter phone number", required: true },
  { name: "address", label: "Address", type: "textarea", placeholder: "Enter customer address", fullWidth: true },
];

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const CreateCustomer = () => (
  <EntityFormPage
    mode="create"
    entityName="Customer"
    endpoint="/api/customers/create"
    listPath="/customers"
    fields={fields}
    initialValues={initialValues}
    icon={FiUserPlus}
    summaryTitle="Customer preview"
    summaryDescription="Create a customer profile for sales, billing and communication."
    previewFields={[
      { name: "name", label: "Name", emptyText: "Customer name" },
      { name: "email", label: "Email", emptyText: "Email address" },
      { name: "phone", label: "Phone", emptyText: "Phone number" },
    ]}
    helpText="Keep customer contact details accurate so sales records stay easy to trace."
  />
);

export default CreateCustomer;
