import { Form, Input, Modal, Select } from "antd";
import { useSelector } from "react-redux";
import { useSelector } from "react-redux";

const AddNewMemberMoadl = () => {
  const project_members = useSelector(
    (state) => state.project.detail_project.users
  );
  const options = project_members.map((member) => ({
    label: member.username,
    value: member.id,
  }));
  return (
    <Modal>
      <Form>
        <Form.Item>
          <Select options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewMemberMoadl;
