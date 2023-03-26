<template>
  <div class="people">
    <!-- Search people -->
    <SearchBar :store="storePeople" type="people" label="Search person..." />

    <!-- People grid -->
    <v-row class="mt-0">
      <div v-if="!storeLoading.loading.people" class="mt-10 w-100 text-center">
        <Loading />
      </div>
      <template v-else>
        <Person v-for="person in storePeople.people" :person="person" :key="person.id" />

        <!-- If there is no person found -->
        <div v-if="!storePeople.people.length" class="w-100 text-center text-h5 mt-5">No people found...</div>
      </template>
    </v-row>

    <!-- Pagination -->
    <div v-if="storePeople.people.length" class="text-center mt-5">
      <Pagination :store="storePeople" type="people" />
    </div>
  </div>
</template>

<script setup>
// imports
import { onMounted } from 'vue';
import { useStorePeople } from '@/stores/storePeople';
import { useStoreLoading } from '@/stores/storeLoading';
import Loading from '@/components/Shared/Loading.vue';
import SearchBar from '@/components/Shared/SearchBar.vue';
import Pagination from '@/components/Shared/Pagination.vue';
import Person from '@/components/Person/Person.vue';

// store
const storePeople = useStorePeople();
const storeLoading = useStoreLoading();

onMounted(() => {
  storePeople.getPeople(storePeople.page);
});
</script>
