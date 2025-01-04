import FormTeztArea from "../components/FormTeztArea";
import FormInput from "../components/FormInput";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useFirebaseStorage } from "../hoks/useFirebaseStorage";
import { useCollection } from "../hoks/useCollection";

const animate = makeAnimated();

const projectType = [
  { value: "smm", label: "smm" },
  { value: "beggent", label: "beggent" },
  { value: "frontent", label: "frontent" },
  { value: "marketing", label: "marketing" },
];

export const action = async ({ request }) => {
  const form = await request.formData();
  const textarea = form.get("describtion");
  const datam = Timestamp.fromDate(new Date(form.get("datam")));
  const projectname = form.get("projectname");
  return { textarea, datam, projectname };
};

function Create() {
  const dataCreate = useActionData();

  const navigate = useNavigate();

  const { addDocument, isPending, error } = useFirebaseStorage("project");
  const { datam } = useCollection("users");

  const [assigment, setAssigment] = useState(null);
  const [project, setProject] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(
      datam?.map((d) => {
        return { value: { ...d }, label: d.displayName };
      })
    );
  }, [datam]);

  const getInfo = (user) => {
    setAssigment(user);
  };
  const selectProject = (type) => {
    setProject(type);
  };

  useEffect(() => {
    if (dataCreate) {
      addDocument({
        ...dataCreate,
        assigment,
        project,
        createdAt: serverTimestamp(new Date()),
      }).then(() => {
        navigate("/");
      });
    }
  }, [dataCreate]);

  return (
    <div className="mt-10 overflow-auto">
      <h1 className="text-3xl font-semibold mb-5">Create new project</h1>
      <Form
        action=""
        method="post"
        className="flex flex-col max-w-[450px] w-full"
      >
        <FormInput
          label="Project name"
          placeholder="Enter project name"
          type="text"
          name="projectname"
        />
        <FormTeztArea name="describtion" />
        <FormInput label="Set" type="date" name="datam" />

        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Project type:</span>
          </div>

          <Select
            onChange={getInfo}
            options={projectType}
            components={animate}
          />
        </label>

        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Assigin use:</span>
          </div>

          <Select
            onChange={selectProject}
            isMulti
            options={user}
            components={animate}
          />
        </label>
        <div className="flex justify-end">
          {isPending && (
            <button className="btn btn-primary disabled">Loading...</button>
          )}
          {!isPending && <button className="btn btn-primary">Submit</button>}
        </div>
      </Form>
    </div>
  );
}

export default Create;
