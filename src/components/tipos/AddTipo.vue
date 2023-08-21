<script  setup>
//import { ref, /*computed /*onMounted*/ } from 'vue';
import { reactive} from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';

const newTipo = reactive({
    id: '',
    name: ''    
});

const router = useRouter();
const selectedId = newTipo.id;
const selectedName = newTipo.name;

function addNewTipo() { 
    
    if (selectedId.valueOf === '') {
        return;
    }
    if (selectedName.valueOf === '') {
        return;
    }
    axios.post("http://localhost:3000/types", newTipo)
    .then(() =>{
        router.push("/tipos");
    });
}

</script>
<template>
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                <h4>Registrar Tipo</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="addNewTipo">

                    <div class="mb-3">
                            <label for="">Id</label>
                            <input type="text" v-model="newTipo.id" class="form-control" id="txtPlaca" required/>
                        </div>
                    <div class="mb-3">
                        <label for="">Nombre</label>
                        <input type="text" v-model="newTipo.name" class="form-control" id="txtName" required/>
                    </div>
                    
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Registrar</button>
                        <RouterLink class="btn btn-info m-2 float-end" to="/areas">Cancelar</RouterLink>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</template>
<style>
.error {
    border-color: red;
}
.error-message {
    color: red;
}
</style>