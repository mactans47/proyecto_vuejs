<script setup>
import {ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const selectedTipoId = ref(null);
const tipos = ref([]);

let updateTipo = reactive({
    id: selectedTipoId,
    name: '',    
});

const router = useRouter();
const route = useRoute();

onMounted(async() => {
    axios.get(`http://localhost:3000/types/${route.params.id}`)
    .then((response) => {
        updateTipo.id = response.data.id;
        updateTipo.name = response.data.name;        
    });
    const responsea = await axios.get('http://localhost:3000/types'); // Cambia la URL si es necesario
    tipos.value = responsea.data;
    
    const selectedTipo = tipos.value.find(tipo => tipo.id === updateTipo.id);
    
    if (selectedTipo) {
        selectedTipoId.value = selectedTipo.id;
    }
})

const editTipo = () =>{
    axios.put(`http://localhost:3000/types/${route.params.id}`, updateTipo)
    .then(() => {
        router.push("/tipos");
    });
};
</script>
<template>
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                <h4>Editar tipo</h4>
                <div class="alert alert-warning" role="alert">Revise los datos de este registro antes de actualizar!</div>
            </div>
            <div class="card-body">
                <form @submit.prevent="editTipo">

                    <div class="mb-3">
                        <label for="">Id</label>
                        <input type="text" v-model="updateTipo.id" class="form-control" id="txtColor" />
                    </div>
                    <div class="mb-3">
                        <label for="">Nombre</label>
                        <input type="text" v-model="updateTipo.name" class="form-control" id="txtName"/>
                    </div>                    
                    
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary"> Actualizar</button>
                        <RouterLink class="btn btn-info m-2 float-end" to="/tipos">Cancelar</RouterLink>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</template>
<style>
</style>
