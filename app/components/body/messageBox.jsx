import { Avatar, AvatarIcon } from "@nextui-org/react";
import he from "he";
import { forwardRef } from "react";

const PCICON = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
      />
    </svg>
  );
};

function MessageBox({ data, isLoading, isError }, ref) {
  return (
    <div
      ref={ref}
      className="bg-background py-2 px-4 flex flex-col gap-1 w-full"
    >
      <div>
        {data?.role === "user" && (
          <h5 className="font-bold relative flex items-center gap-3 mb-2">
            <Avatar icon={<AvatarIcon />} size="sm" />
            <span> {data?.role}:</span>
          </h5>
        )}

        {data?.role === "system" && (
          <h5 className="font-bold relative flex items-center gap-3 mb-2">
            <Avatar icon={<PCICON />} size="sm" />

            <span> {data?.role}:</span>
          </h5>
        )}
      </div>

      {data?.role === "user" ? (
        <div>{data?.content}</div>
      ) : data?.role === "system" ? (
        !isLoading && !isError ? (
          <div
            dangerouslySetInnerHTML={{ __html: he.decode(data?.content) }}
          ></div>
        ) : isLoading ? (
          <div>Processing....</div>
        ) : isError ? (
          <div className="flex flex-col gap-1">
            <span className="py-1 text-red-400">Something went wrong....</span>
            <button
              type="button"
              className="inline w-fit py-1 px-2 bg-red-300 rounded-md"
              onClick={() => {
                location.reload();
              }}
            >
              Reload
            </button>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default forwardRef(MessageBox);
