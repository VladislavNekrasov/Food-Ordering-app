import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Grid, Form, Button, Icon, Segment, Table, Modal } from "semantic-ui-react";
import axios from "axios";

export function CreateMenu() {
  const [title, setTitle] = useState("");

  const createMenu = async () => {
    axios.post(
      'http://localhost:8080/api/FoodOrdering/menu',
      {
        title,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  };

  return (
    <div>
      <MainMenu />

      <Grid columns={2} >
        <Grid.Column width={2} id='main'>
        </Grid.Column>

        <Grid.Column floated='left' textAlign='left' verticalAlign='top' width={13}>
          <Segment id='segment' color='teal'>

            <Form >
              <Form.Field>
                <label>Pavadinimas</label>
                <input name="name" placeholder="Pavadinimas" onChange={(e) => setTitle(e.target.value)} />
              </Form.Field>

              <div >
                <Button class="ui blue button" id='details' type='submit' href='#/menus' className="controls" primary onClick={createMenu}>Sukurti</Button>
                <Button class="ui red button" icon labelPosition="left" className="" href='#/menus'><Icon name="arrow left" />Atgal</Button>
              </div>
            </Form>

          </Segment>
        </Grid.Column>

      </Grid>
    </div>
  );
}