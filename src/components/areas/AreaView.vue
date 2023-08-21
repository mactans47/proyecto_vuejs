<template>
    <div>       

        <h3 align="center">ÁREAS</h3>
          
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-4">
                    <RouterLink class="btn btn-primary m-2 float-end" to="/add-areas">Agregar area</RouterLink>
                </div>
                <div class="col-4">
                   <div class="input-group ">
                        <input v-model="search" type="text" class="form-control m-2 float-end" placeholder="Buscar...">                        
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Nombre
                    </th>
                    <th>
                        Acción
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(area, index) in this.areas" :key="index">
                    <td>{{ area.id }}</td>
                    <td>{{ area.name }}</td>
                    <td>
                        <RouterLink class="btn btn-warning bi bi-pencil-square" :to="`/edit-areas/${area.id}`"></RouterLink>
                        <RouterLink class="btn btn-danger bi bi-trash" :to="`/delete-areas/${area.id}`"></RouterLink>
                        <!--button type="button" @click="openDeleteModal" class="btn btn-danger bi bi-trash"></button-->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'areaView',
    data() {
        return {
            modalTitle: "",
            areas: [],
            id: 0,
            name: "",
            isLoading: false,
            search: ''
        };
    },
    methods: {
        refreshData() {
            axios.get('http://localhost:3000/areas')
                .then((response) => {
                    this.areas = response.data;
                });
        },

        addClick() {
            this.modalTitle = "Registrar areas";
            this.id = 0;
            this.name = "";
        },
        editClick(area) {
            this.modalTitle = "Edit area";
            this.id = area.id;
            this.name = area.name;
        },
        createClick() {
            axios.post("area", {
                PersonaNombre: this.PersonaNombre,
                PersonaPaterno: this.PersonaPaterno,
                PersonaMaterno: this.PersonaMaterno,
                PersonaTelefono: this.PersonaTelefono
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        updateClick() {
            axios.put("area", {
                id: this.id,
                name: this.name,
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        deleteClick(id) {
            if (!confirm("Está seguro de eliminar?")) {
                return;
            }
            axios.delete("area/" + id)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        buscarAreas: function(val){
            this.areas = this.areas.filter(
                (value) => {
                    return value.name.toLowerCase().indexOf(
                        val.toLowerCase()
                    )>=0                     
                }
            )
        }
    },
    watch:{
        search: function(val){
            if(this.search !== ""){
                this.buscarAreas(val);    
            }else{
                this.refreshData();
           }            
        }
    },
    mounted() {
        //      this.isLoading= true;
        this.refreshData();
    }
    //   components: { ConfirmDeleteModal }
};
</script>