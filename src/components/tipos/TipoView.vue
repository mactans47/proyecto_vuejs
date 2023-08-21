<template>
    <div>
        <h3 align="center">TIPOS</h3>

        <div class="container">
            <div class="row justify-content-between">
                <div class="col-4">
                    <RouterLink class="btn btn-primary m-2 float-end" to="/add-tipos">Agregar tipo</RouterLink>
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
                <tr v-for="(tipo, index) in this.tipos" :key="index">
                    <td>{{ tipo.id }}</td>
                    <td>{{ tipo.name }}</td>
                    <td>
                        <RouterLink class="btn btn-warning bi bi-pencil-square" :to="`/edit-tipos/${tipo.id}`"></RouterLink>
                        <RouterLink class="btn btn-danger bi bi-trash" :to="`/delete-tipos/${tipo.id}`"></RouterLink>
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
    name: 'tipoView',
    data() {
        return {
            modalTitle: "",
            tipos: [],
            id: 0,
            name: "",
            isLoading: false,
            search:''
        };
    },
    methods: {
        refreshData() {
            axios.get('http://localhost:3000/types')
                .then((response) => {
                    this.tipos = response.data;
                });
        },

        addClick() {
            this.modalTitle = "Registrar tipos";
            this.id = 0;
            this.name = "";
        },
        editClick(tipo) {
            this.modalTitle = "Edit tipo";
            this.id = tipo.id;
            this.name = tipo.name;
        },
        createClick() {
            axios.post("tipo", {
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
            axios.put("tipo", {
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
            axios.delete("tipo/" + id)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        buscarTipos: function(val){
            this.tipos = this.tipos.filter(
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
                this.buscarTipos(val);    
            }else{
                this.refreshData();
           }            
        }
    },
    mounted() {        
        this.refreshData();
    }    
};
</script>