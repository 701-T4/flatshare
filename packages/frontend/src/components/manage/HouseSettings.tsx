import {
  Container,
  Row,
  Input,
  Col,
  Button,
  FormElement,
  Text,
} from '@nextui-org/react';
import React, { useState } from 'react';

interface HouseSettingsProps {
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
    <div style={{ margin: 'auto' }}>
      <Text
        size={24}
        weight={'bold'}
        color={'primary'}
        className="ml-5 inline-block"
      >
        {houseSettingsData.houseName}
        <div className="bg-black h-0.5 w-full" />
      </Text>
      <Container
        xl
        style={{ backgroundColor: '#1D2530' }}
        className="rounded-xl p-6 mt-4"
      >
        <Row>
          <Col>
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
              width="60%"
            />
          </Col>
          <Col>
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
              width="60%"
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
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
              width="60%"
            />
          </Col>

          <Col>
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
              width="60%"
            />
          </Col>
        </Row>

        <div className="flex justify-end mt-12 mr-5 ">
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
    </div>
  );
};

export default HouseSettings;
