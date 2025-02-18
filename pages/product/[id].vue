<template>
  <div v-if="product">
    <v-card>
      <v-row>
        <v-col cols="12" md="6">
          <v-img
            :src="product.image"
            height="400"
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
        </v-col>
        
        <v-col cols="12" md="6">
          <v-card-title class="text-h4">
            {{ product.title }}
          </v-card-title>
          
          <v-card-text>
            <p class="text-h6 font-weight-bold mt-4">
              ${{ product.price }}
            </p>
            
            <p class="mt-4">
              {{ product.description }}
            </p>
            
            <v-btn
              color="primary"
              size="large"
              class="mt-6"
              @click="addToCart(product)"
            >
              Добавить в корзину
            </v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const product = ref(null)
const { addToCart } = useCart()

onMounted(async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`)
    product.value = await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
  }
})
</script>