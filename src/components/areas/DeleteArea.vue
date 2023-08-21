<script setup>
import {ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const selectedAreaId = ref(null);
const areas = ref([]);

let updateArea = reactive({
    id: "",
    name: selectedAreaId,    
});

const router = useRouter();
const route = useRoute();

onMounted(async() => {
    axios.get(`http://localhost:3000/areas/${route.params.id}`)
    .then((response) => {
        updateArea.id = response.data.id;
        updateArea.name = response.data.name;        
    });
    const responsea = await axios.get('http://localhost:3000/areas'); // Cambia la URL si es necesario
    areas.value = responsea.data;
    
    const selectedArea = areas.value.find(area => area.id === updateArea.areasId);
    
    if (selectedArea) {
        selectedAreaId.value = selectedArea.id;
    }
})

const deleteArea = () =>{
    axios.delete(`http://localhost:3000/areas/${route.params.id}`, updateArea)
    .then(() => {
        router.push("/areas");
    });
};
</script>
<template>
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                <h4>Eliminar área</h4>
                <div class="alert alert-danger" role="alert">Esta a punto de eliminar este registro!</div>
            </div>
            <div class="card-body">
                <form @submit.prevent="deleteArea">

                    <div class="mb-3">
                        <label for="">Id</label>
                        <input type="text" v-model="updateArea.id" class="form-control" id="txtColor" disabled/>
                    </div>
                    <div class="mb-3">
                        <label for="">Nombre</label>
                        <input type="text" v-model="updateArea.name" class="form-control" id="txtName" disabled/>
                    </div>                    
                    
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary"> Eliminar</button>
                        <RouterLink class="btn btn-info m-2 float-end" to="/areas">Cancelar</RouterLink>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</template>
<style>
</style>
