import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Icon, Input, Segment, Table } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';
import MainMenu from '../../Components/MainMenu';
import axios from 'axios';

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export function EditMeal() {
  const params = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/menus/edit/${params.menuid}`);
  };

  const [error, setError] = useState('');
  const [meals, setMeals] = useState({
    title: '',
    description: '',
    
  });

  useEffect(() => {
    if (params.mealid) {
      fetch(`http://localhost:8080/api/FoodOrdering/meal/${params.mealid}`, {
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          setMeals(data);
        })
        .catch(error => console.error(error));
    }
  }, [params.mealid]);

  const updateMeals = () => {
    axios
      .put(
        `http://localhost:8080/api/FoodOrdering/meal/update/${params.menuid}/${params.mealid}`,
        meals,
        {
          withCredentials: true,
          headers: JSON_HEADERS,
        }
      )
      .then(response => {
        if (response.status === 200) {
          setError('');
        } else {
          throw new Error('Update failed');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const updateProperty = (property, value) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [property]: value,
    }));
  };

  return (
    <div>
      <MainMenu />

      <Grid columns={2}>
        <Grid.Column width={2} id="main" />
        <Grid.Column textAlign="left" verticalAlign="top" width={13}>
          <Segment id="segment" color="teal">
            <div>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Dish title</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <Input
                        value={meals.title}
                        onChange={e => updateProperty('title', e.target.value)}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Input
                        value={meals.description}
                        onChange={e => updateProperty('description', e.target.value)}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
        
              <Divider hidden></Divider>

              <Button icon labelPosition="left" className="" onClick={handleGoBack}>
                <Icon name="arrow left" />
                Back
              </Button>
              <Button primary className="controls" id="details" onClick={updateMeals}>
                Update
              </Button>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}
