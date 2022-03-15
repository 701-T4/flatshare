import { Button, Input, Textarea } from '@nextui-org/react';

const FlatMates = [
  {
    name: 'Samuel',
  },
  {
    name: 'David',
  },
  {
    name: 'Owen',
  },
];

interface NewBillCardProps {
  title?: string;
  detail?: string;
}

const NewBillCard: React.FC<NewBillCardProps> = () => {
  console.log(FlatMates);
  return (
    <div className="shadow-lg rounded-b-xl">
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-left rounded-t-xl px-4 py-1 text-white font-semibold text-lg">
          <div className="flex flex-row justify-between flex-wrap">
            <div className="self-center">Bill</div>
            <div className="self-center">
              Total Cost: $
              <input
                className="appearance-none  rounded-lg pl-1 ml-2 h-5 w-[10rem] text-black"
                type="text"
              />
            </div>
            <div className="self-center">
              Due Date:
              <input
                className="appearance-none  rounded-lg pl-1 ml-2 h-5 w-[10rem] text-black"
                type="text"
              />
            </div>
            <div className="self-end">
              <Button
                size="xs"
                rounded
                className="w-auto h-10 mb-1 mt-1 text-base"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-full px-4 py-4 bg-gray-800 rounded-b-xl lg:px-8  justify-between">
          <div className="flex flex-col text-white gap-y-3">
            <div className="flex flex-row justify-between">
              <div className="self-center">Title</div>
              <input
                className="appearance-none  rounded-lg pl-3  h-5 w-[13rem] text-black"
                type="text"
              />
            </div>
            <div className="flex flex-row justify-items-center">
              <div className="self-center mr-3">Details</div>
              <Textarea size="lg" animated={false}></Textarea>
            </div>
          </div>
          <div className="flex flex-col self-start">
            <Button
              size="xs"
              rounded
              className="w-auto h-10 mb-1 mt-1 text-base p-5"
            >
              Split Evenly
            </Button>
          </div>
          <div className="flex flex-col self-start gap-3">
            {FlatMates.map((person, index) => {
              return (
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-4 rounded-xl font-bold">
                  <div
                    key={index + person.name}
                    className="text-white flex self-center justify-between"
                  >
                    {person.name}
                    <input
                      className="appearance-none  rounded-lg pl-1 ml-2 h-5 w-[9rem] text-black self-center "
                      type="text"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBillCard;
