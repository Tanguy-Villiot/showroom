import { MDBDataTable } from 'mdbreact';


export default function Results(){

    const dataValue = {
        columns: [
            {
                label: 'Image',
                field: 'name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Utilisateur',
                field: 'email',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Votes',
                field: 'votes',
                sort: 'asc',
                width: 200
            },
            {
                label: 'positions',
                field: 'pos',
                sort: 'asc',
                width: 100
            }
        ],
        rows: [

        ]
    };


    return <div>
        <h1>Results</h1>

        <MDBDataTable
            striped
            bordered
            small
            data={dataValue}
        />
    </div>

}