import { FiEdit3 } from "react-icons/fi";
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

const UpdateSupplier = () => (
  <EntityFormPage
    mode="update"
    entityName="Supplier"
    endpoint="/api/suppliers/update"
    listPath="/suppliers"
    fields={fields}
    initialValues={initialValues}
    icon={FiEdit3}
    summaryTitle="Supplier preview"
    summaryDescription="Update supplier contact and company details."
    previewFields={[
      { name: "name", label: "Supplier", emptyText: "Supplier name" },
      { name: "contact_person", label: "Contact", emptyText: "Contact person" },
      { name: "company", label: "Company", emptyText: "Company name" },
    ]}
    helpText="Keeping supplier records current improves purchase tracking."
  />
);

export default UpdateSupplier;
