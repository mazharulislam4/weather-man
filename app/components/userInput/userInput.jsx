
import { Textarea } from "@nextui-org/react";
const LeftSendIconButton = ({ disable }) => {
  return (
    <div className="  w-[40px]  h-[40px] absolute right-4 bottom-[10px] rounded-xl ">
      <button
        type="submit"
        className=" flex rounded-xl  bg-black justify-center items-center  h-full  w-full max-auto disabled:bg-gray-500"
        disabled={disable}
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-8 h-6 transform -rotate-90"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
    </div>
  );
};


function UserInput({ value, changeHandler, submitHandler , disable }) {
  return (
    <form
      className=" w-full bg-background   h-full  overflow-hidden  relative rounded-xl "
      onSubmit={submitHandler}
    >
      <div className="relative w-full ">
        <Textarea
          minRows={1}
          name="userInput"
          onChange={changeHandler}
          placeholder="Write your zip code "
          radius="lg"
          value={value}
          classNames={{
            innerWrapper: "!items-center relative  ",
            inputWrapper:
              "!bg-transparent shadow-xl border py-0 px-0 pl-3 pr-0 shadow-none h-full",
            input: "placeholder:text-[1rem] py-5 !pr-16",
          }}
          endContent={<LeftSendIconButton disable={disable} />}
        />
      </div>
    </form>
  );
}

export default UserInput;
