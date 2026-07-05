import { FiTruck } from "react-icons/fi";
import EntityFormPage from "../../components/EntityFormPage";

const fields = [
  { name: "name", label: "Supplier name", placeholder: "Enter supplier name", required: true, fullWidth: true },
  { name: "contact_person", label: "Contact person", placeholder: "Enter contact person" },
  { name: "email", label: "Email address", type: "email", placeholder: "supplier@example.com", required: true },
  { name: "city", label: "City", placeholder: "Enter city" },
  { name: "country", label: "Country", placeholder: "Enter country" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Enter phone number",required: true,fullWidth: true },
  { name: "address", label: "Address", type: "textarea", placeholder: "Enter supplier address", fullWidth: true },
  { name: "status", label: "Status", type: "checkbox", placeholder: "Active supplier" },
];

const initialValues = {
  name: "",
  contact_person: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  status: true,
};

const CreateSupplier = () => (
  <EntityFormPage
    mode="create"
    entityName="Supplier"
    endpoint="/api/suppliers/create"
    listPath="/suppliers"
    fields={fields}
    initialValues={initialValues}
    icon={FiTruck}
    summaryTitle="Supplier preview"
    summaryDescription="Create supplier records for purchasing and inventory workflows."
    previewFields={[
      { name: "name", label: "Supplier", emptyText: "Supplier name" },
      { name: "contact_person", label: "Contact", emptyText: "Contact person" },
      { name: "company", label: "Company", emptyText: "Company name" },
    ]}
    helpText="Supplier profiles help purchase records stay connected to the right vendor."
  />
);

export default CreateSupplier;
