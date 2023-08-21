<script  setup>
//import { ref, /*computed /*onMounted*/ } from 'vue';
import { reactive} from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';

const newArea = reactive({
    id: '',
    name: ''    
});

//const isInvalidSelectId= computed(() => selectedId.value === null);
//const isInvalidSelectName = computed(() => selectedName.value === null);

const router = useRouter();
const selectedId = newArea.id;
const selectedName = newArea.name;

function addNewArea() { 
    
    if (selectedId.valueOf === '') {
        return;
    }
    if (selectedName.valueOf === '') {
        return;
    }
    axios.post("http://localhost:3000/areas", newArea)
    .then(() =>{
        router.push("/areas");
    });
}

</script>
<template>
    <div class="container w-50">
        <div class="card">
            <div class="card-header">
                <h4>Registrar área</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="addNewArea">

                    <div class="mb-3">
                            <label for="">Id</label>
                            <input type="text" v-model="newArea.id" class="form-control" id="txtPlaca" required/>
                        </div>
                    <div class="mb-3">
                        <label for="">Nombre</label>
                        <input type="text" v-model="newArea.name" class="form-control" id="txtName" required/>
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