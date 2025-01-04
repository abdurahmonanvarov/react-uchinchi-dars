import { Form, useActionData } from "react-router-dom";
import FormInput from "./FormInput";
import { useEffect, useState } from "react";
import { useFirebaseStorage } from "../hoks/useFirebaseStorage";
import { useCollection } from "../hoks/useCollection";

export const action = async ({ request }) => {
  const form = await request.formData();
  const newComment = form.get("comment");
  return { newComment };
};

const ProjectComponent = () => {
  const commit = useActionData();
  const { addDocument } = useFirebaseStorage("comment");
  const { datam } = useCollection("comment");
  const [comments, setComments] = useState([]);

  // Add new comment to Firebase and local state
  useEffect(() => {
    if (commit) {
      addDocument({
        message: commit.newComment,
        time: new Date().toLocaleTimeString(),
        type: "sent", // Example: 'sent' or 'received'
      });
    }
  }, [commit]);

  // Sync Firebase data to local state

  useEffect(() => {
    if (datam) {
      setComments(datam);
    }
  }, [datam]);

  return (
    <div className="flex flex-col items-center  p-4 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between w-full items-center mb-4">
        <h1 className="text-3xl font-bold">Project</h1>
      </div>

      {/* Main Content */}
      <div className="flex w-full gap-4">
        {/* Left Section */}
        <div className="flex-1 bg-white shadow-md p-4 rounded-lg border">
          <h2 className="text-lg font-bold mb-2">Project Title</h2>
          <p className="text-sm text-gray-500 mb-4">Due by Mon Feb 20 2025</p>
          <p className="text-sm text-gray-700 mb-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit ultrices ut
            tristique gravida feugiat pretium fusce odio orci curabitur nam
            aliquam molestie quam aenean dis.
          </p>
          {/* Buttons */}
          <div className="flex gap-4">
            <button className="btn btn-success flex-1">
              Completed Project
            </button>
            <button className="btn btn-error flex-1">Delete Project</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white shadow-md p-4 rounded-lg border">
          <h2 className="text-lg font-bold mb-4">Project Comments</h2>
          {/* Comments */}
          <div className="flex flex-col gap-4 h-64 overflow-y-auto">
            {comments.map((comment, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 ${
                  comment.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <span className="text-sm text-gray-500">{comment.time}</span>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    comment.type === "resive" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm">{comment.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <Form method="post" className="flex items-center gap-2 mt-4">
            <FormInput
              type="text"
              placeholder="Type here..."
              name="comment"
              className="flex-1 input input-bordered"
            />
            <button className="btn btn-primary">Send</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
