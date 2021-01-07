<template>
  <v-card class="mx-auto">
    <v-card-title>{{ NumComment }} {{ TitleCommenti }}</v-card-title>
    <v-container>
      <v-list three-line>
        <template v-for="(item, index) in Comments">
          <v-divider
            v-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>
          <v-list-item v-else :key="item.id">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.user"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.content"
              ></v-list-item-subtitle>
              <v-expansion-panels :flat="true">
                <v-expansion-panel>
                  <v-expansion-panel-header>1 Risposta</v-expansion-panel-header>
                  <v-expansion-panel-content> </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </v-card>
</template>