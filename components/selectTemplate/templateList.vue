<template>
    <v-container>
        <v-row>
            <v-col 
            v-for="(item,index) in items" :key="index"
            class="d-flex child-flex"
            style="justify-content: center;"
            cols="12" sm="6" md="4" lg="3">
                <v-card
                max-width="300px"
                >
                <!--                    
                    <img 
                    :srcSet="item.srcSet" 
                    v-lazy="item.src" />
                    -->
                    <img 
                    v-lazy="item.src" />

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style >
img {
  max-width: 100%;
  height: auto;
}
</style>
<script>
export default {

  data () {
    return {
        items:[

/*
{src:require('@/assets/images/original/alex-nicolopoulos-hxn2HjZHyQE-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/arjun-ken-CeK8ohn3c7A-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/brian-asare-91NYyecWlHA-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/deva-williamson-ntfGWVbBiO0-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/dmitry-chernyshov-vzVWYIr6F8U-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/dylan-gillis-KdeqA3aTnBY-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/fabio-hanashiro-6Jsf8Hyz77A-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/filip-kominik-gRH_diOiwWM-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/gregoire-bertaud-L8JMAWbHXeg-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/hamid-roshaan-BQrzI0vi9x0-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/jae-park-7GX5aICb5i4-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/jamie-street-YxRHkHBcoQs-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/jonas-vincent-xulIYVIbYIc-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/jonathan-borba-sfOOhuw-K8w-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/jorge-rosales-Glz3qayP5us-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/kote-from-mars-s3GJtcYECR8-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/mak-7qEGSeXcd30-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/mak-BFlpLcOy-KE-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/mak-Jx6SRt4O6k8-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/mak-vCxGsqShl7s-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/mark-olsen-tjZPseTxe6k-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/matteo-vistocco-6lUKsY4j0bU-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/morgan-lane-18N4okmWccM-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/ryoji-iwata-hGWKGile6bs-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/sasha-zlochevskaya-hl0mW2mvZpE-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/sharon-mccutcheon-NkQD-RHhbvY-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/shunya-koide-Us28A8wygtU-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/stories-ys8qztLjJyg-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/takashi-miyazaki-9wVMpUP9r0E-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/tim-zankert-gm3M-CsuynI-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
{src:require('@/assets/images/original/wout-vanacker-l4HBYkURqvE-unsplash.jpg'+"?resize&sizes[]=300&sizes[]=600&sizes[]=1000")},
*/
{src:require('@/assets/images/W600PX/alex-nicolopoulos-hxn2HjZHyQE-unsplash.jpg')},
{src:require('@/assets/images/W600PX/arjun-ken-CeK8ohn3c7A-unsplash.jpg')},
{src:require('@/assets/images/W600PX/brian-asare-91NYyecWlHA-unsplash.jpg')},
{src:require('@/assets/images/W600PX/deva-williamson-ntfGWVbBiO0-unsplash.jpg')},
{src:require('@/assets/images/W600PX/dmitry-chernyshov-vzVWYIr6F8U-unsplash.jpg')},
{src:require('@/assets/images/W600PX/dylan-gillis-KdeqA3aTnBY-unsplash.jpg')},
{src:require('@/assets/images/W600PX/fabio-hanashiro-6Jsf8Hyz77A-unsplash.jpg')},
{src:require('@/assets/images/W600PX/filip-kominik-gRH_diOiwWM-unsplash.jpg')},
{src:require('@/assets/images/W600PX/gregoire-bertaud-L8JMAWbHXeg-unsplash.jpg')},
{src:require('@/assets/images/W600PX/hamid-roshaan-BQrzI0vi9x0-unsplash.jpg')},
{src:require('@/assets/images/W600PX/jae-park-7GX5aICb5i4-unsplash.jpg')},
{src:require('@/assets/images/W600PX/jamie-street-YxRHkHBcoQs-unsplash.jpg')},
{src:require('@/assets/images/W600PX/jonas-vincent-xulIYVIbYIc-unsplash.jpg')},
{src:require('@/assets/images/W600PX/jonathan-borba-sfOOhuw-K8w-unsplash.jpg')},
{src:require('@/assets/images/W600PX/jorge-rosales-Glz3qayP5us-unsplash.jpg')},
{src:require('@/assets/images/W600PX/kote-from-mars-s3GJtcYECR8-unsplash.jpg')},
{src:require('@/assets/images/W600PX/mak-7qEGSeXcd30-unsplash.jpg')},
{src:require('@/assets/images/W600PX/mak-BFlpLcOy-KE-unsplash.jpg')},
{src:require('@/assets/images/W600PX/mak-Jx6SRt4O6k8-unsplash.jpg')},
{src:require('@/assets/images/W600PX/mak-vCxGsqShl7s-unsplash.jpg')},
{src:require('@/assets/images/W600PX/mark-olsen-tjZPseTxe6k-unsplash.jpg')},
{src:require('@/assets/images/W600PX/matteo-vistocco-6lUKsY4j0bU-unsplash.jpg')},
{src:require('@/assets/images/W600PX/morgan-lane-18N4okmWccM-unsplash.jpg')},
{src:require('@/assets/images/W600PX/ryoji-iwata-hGWKGile6bs-unsplash.jpg')},
{src:require('@/assets/images/W600PX/sasha-zlochevskaya-hl0mW2mvZpE-unsplash.jpg')},
{src:require('@/assets/images/W600PX/sharon-mccutcheon-NkQD-RHhbvY-unsplash.jpg')},
{src:require('@/assets/images/W600PX/shunya-koide-Us28A8wygtU-unsplash.jpg')},
{src:require('@/assets/images/W600PX/stories-ys8qztLjJyg-unsplash.jpg')},
{src:require('@/assets/images/W600PX/takashi-miyazaki-9wVMpUP9r0E-unsplash.jpg')},
{src:require('@/assets/images/W600PX/tim-zankert-gm3M-CsuynI-unsplash.jpg')},
{src:require('@/assets/images/W600PX/wout-vanacker-l4HBYkURqvE-unsplash.jpg')},

        ],
    }
  },
}
</script>