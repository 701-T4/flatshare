import { Container, Input, Button, FormElement } from '@nextui-org/react';
import React, { useState } from 'react';

export interface HouseSettingsProps {
  ownerView: boolean;
  houseName: string;
  totalRent?: number;
  maxNumOccupants?: number;
  address?: string;
  ownerContactNum?: string;
  onUpdateHouse: Function;
}

const HouseSettings: React.FC<HouseSettingsProps> = (props) => {
  const [houseSettingsData, setHouseSettingsData] =
    useState<HouseSettingsProps>({ ...props });

  return (
    <Container xl className="p-6 mt-4 bg-gray-800 rounded-xl">
      <div className="flex flex-col gap-y-3 sm:gap-y-10 sm:pt-5 sm:flex-row sm:flex-wrap sm:gap-x-28">
        <div className="w-full sm:w-2/6">
          <Input
            label="Total Rent:"
            type="number"
            readOnly={!props.ownerView}
            initialValue={props.totalRent ? props.totalRent.toString() : ''}
            onChange={(e: React.ChangeEvent<FormElement>) => {
              setHouseSettingsData({
                ...houseSettingsData,
                totalRent: Number(e.target.value),
              });
            }}
            color="secondary"
            labelRight={'$'}
            // className='w-full'
            width="100%"
          />
        </div>
        <div className="w-full sm:w-2/6">
          <Input
            label="Maximum occupancy:"
            type="number"
            readOnly={!props.ownerView}
            initialValue={
              props.maxNumOccupants ? props.maxNumOccupants.toString() : ''
            }
            onChange={(e: React.ChangeEvent<FormElement>) => {
              setHouseSettingsData({
                ...houseSettingsData,
                maxNumOccupants: Number(e.target.value),
              });
            }}
            color="secondary"
            // className='w-full'
            width="100%"
          />
        </div>
        <div className="w-full sm:w-2/6">
          <Input
            label="Address:"
            type="text"
            readOnly={!props.ownerView}
            initialValue={props.address}
            onChange={(e: React.ChangeEvent<FormElement>) => {
              setHouseSettingsData({
                ...houseSettingsData,
                address: e.target.value,
              });
            }}
            color="secondary"
            // className='w-full'
            width="100%"
          />
        </div>

        <div className="w-full sm:w-2/6">
          <Input
            label="Owner Contact Number:"
            type="text"
            readOnly={!props.ownerView}
            initialValue={props.ownerContactNum}
            onChange={(e: React.ChangeEvent<FormElement>) => {
              setHouseSettingsData({
                ...houseSettingsData,
                ownerContactNum: e.target.value,
              });
            }}
            color="secondary"
            // className='w-full'
            width="100%"
          />
        </div>
      </div>

      <div className="flex justify-end w-full mt-6 mr-5 sm:mt-12 sm:w-auto ">
        {props.ownerView && (
          <>
            <Button
              disabled={!props.ownerView}
              onClick={() => {
                props.onUpdateHouse(houseSettingsData);
              }}
              className="inline-block ml-4 bg-btn_green"
            >
              Save
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default HouseSettings;
