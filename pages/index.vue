<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-card class="mb-4">
          <v-card-title>Категории</v-card-title>
          <v-list>
            <v-list-item
              v-for="category in categoriesWithImages"
              :key="category.name"
              :to="'/category/' + category.name"
              :title="category.name"
            >
              <template v-slot:prepend>
                <v-avatar size="40" rounded="0">
                  <v-img
                    :src="category.image"
                    cover
                    class="bg-grey-lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey-lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="9">
        <v-row>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="mx-auto"
              height="100%"
              :loading="loading"
            >
              <v-img
                :src="product.image"
                height="200"
                cover
                class="bg-grey-lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey-lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>

              <v-card-title>
                <nuxt-link
                  :to="'/product/' + product.id"
                  class="text-decoration-none text-black"
                >
                  {{ product.title }}
                </nuxt-link>
              </v-card-title>

              <v-card-text>
                <v-row align="center">
                  <v-col>
                    <div class="text-h6 font-weight-bold">
                      ${{ product.price }}
                    </div>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      color="primary"
                      @click="addToCart(product)"
                    >
                      Купить
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Product, Category } from '~/types'

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const loading = ref<boolean>(true)
const { addToCart } = useCart()

const categoriesWithImages = computed<Category[]>(() => {
  return categories.value.map(category => {
    const categoryProduct = products.value.find(product => product.category === category)
    return {
      name: category,
      image: categoryProduct?.image || 'https://via.placeholder.com/150'
    }
  })
})

onMounted(async () => {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch('https://fakestoreapi.com/products'),
      fetch('https://fakestoreapi.com/products/categories')
    ])
    
    products.value = await productsResponse.json()
    categories.value = await categoriesResponse.json()
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style>