<template>
  <div class="flex items-center justify-between py-5">
    <div class="text-xl font-bold">
      Last Changed at: <span class="text-gray-500"> 5/25/2023, 9:49:49 PM</span>
    </div>
    <div class="text-xl font-bold">
      Total Hours Last 3 Months: <span class="text-gray-500">0 Hours</span>
    </div>
    <div class="text-xl font-bold">
      Total Hours Next 3 Months: <span class="text-gray-500">0 Hours</span>
    </div>
  </div>
  <div>
    <h1 class="text-4xl font-bold">PAST / CONTINUING STAGE</h1>
    <div>
      <table v-if="StageArray.length !== 0" class="w-full my-5 text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="(tHead, index) in tHeadArray"
              :key="index"
              class="px-4 py-3 font-normal"
            >
              {{ tHead }}
            </th>
          </tr>
        </thead>
        <tbody class="text-gray-500">
          <tr v-for="(item, index) in StageArray" :key="index">
            {{
              console.log(item)
            }}
            <td class="px-2 py-3">
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-if="index === editingIndex"
                v-model="editRow.workToBeDone"
              >
                <option value="Service 1">Service 1</option>
                <option value="Service 2">Service 2</option>
                <option value="Service 3">Service 3</option>
              </select>
              <div v-else>
                {{ item.workToBeDone }}
              </div>
            </td>
            <td class="px-2 py-3">
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                placeholder="Ex: 60.25"
                v-if="index === editingIndex"
                v-model="editRow.hoursLast3Months"
              />
              <div v-else>
                {{ item.hoursLast3Months }}
              </div>
            </td>
            <td class="px-2 py-3">
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                placeholder="Ex: 60.25"
                v-if="index === editingIndex"
                v-model="editRow.hoursNext3Months"
              />
              <div v-else>
                {{ item.hoursNext3Months }}
              </div>
            </td>
            <td class="px-2 py-3">
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-if="index === editingIndex"
                v-model="editRow.primaryStakeHolder"
              >
                <option value="My Manager">My Manager</option>
                <option value="My Team">My Team</option>
                <option value="My Self">My Self</option>
                <option value="Leader">Leader</option>
                <option value="Executive Staff">Executive Staff</option>
                <option value="Functional Group">Functional Group</option>
              </select>
              <div v-else>
                {{ item.primaryStakeHolder }}
              </div>
            </td>
            <td class="px-2 py-3">
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-if="index === editingIndex"
                v-model="editRow.outcome"
              >
                <option value="Revenue Gen">Revenue Gen</option>
                <option value="Profitability">Profitability</option>
                <option value="Customer Set">Customer Set</option>
                <option value="Employee Set">Employee Set</option>
              </select>
              <div v-else>
                {{ item.outcome }}
              </div>
            </td>
            <td class="px-2 py-3">
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-if="index === editingIndex"
                v-model="editRow.skillsRequired"
              >
                <option value="Core">Core</option>
                <option value="Skilled">Skilled</option>
                <option value="Expert">Expert</option>
              </select>
              <div v-else>
                {{ item.skillsRequired }}
              </div>
            </td>
            <td class="px-2 py-3">
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-if="index === editingIndex"
                v-model="editRow.workQuality"
              >
                <option value="The service is working well">
                  The service is working well
                </option>
                <option value="The service need improving">
                  The service need improving
                </option>
                <option
                  value="Enviornmental/Team danamics impacting service Effectiveness"
                >
                  Enviornmental/Team danamics impacting service Effectiveness
                </option>
                <option value="Improvement is in process">
                  Improvement is in process
                </option>
                <option value="This service could be automated/outsourced">
                  This service could be automated/outsourced
                </option>
                <option value="Service not needed/Not Adding value">
                  Service not needed/Not Adding value
                </option>
              </select>
              <div v-else>
                {{ item.workQuality }}
              </div>
            </td>
            <td class="px-2 py-3">
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-if="index === editingIndex"
                v-model="editRow.cabability"
              >
                <option value="I am fully capable and confident">
                  I am fully capable and confident
                </option>
                <option value="This service offers me an opportunity to grow">
                  This service offers me an opportunity to grow
                </option>
                <option
                  value="This is a stretch for me; need additional support"
                >
                  This is a stretch for me; need additional support
                </option>
                <option value="My talent is NOT aligned with this service">
                  My talent is NOT aligned with this service
                </option>
                <option value="There is another person I know is better suited">
                  There is another person I know is better suited
                </option>
              </select>
              <div v-else>
                {{ item.cabability }}
              </div>
            </td>
            <td class="px-2 py-3">
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-if="index === editingIndex"
                v-model="editRow.interest"
              >
                <option value="Enjoy this service; would like to keep doing it">
                  Enjoy this service; would like to keep doing it
                </option>
                <option value="Dislike this service; Would prefer not to do it">
                  Dislike this service; Would prefer not to do it
                </option>
                <option
                  value="Been there done that; I am not learning or growing"
                >
                  Been there done that; I am not learning or growing
                </option>
                <option
                  value="Would like to train/ Mentor others to do this service"
                >
                  Would like to train/ Mentor others to do this service
                </option>
                <option
                  value="Specific project that is completed/no longer needed"
                >
                  Specific project that is completed/no longer needed
                </option>
                <option value="Not doing this, but would like to in the future">
                  Not doing this, but would like to in the future
                </option>
              </select>
              <div v-else>
                {{ item.interest }}
              </div>
            </td>
            <td class="px-2 py-3">
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="comment..."
                v-if="index === editingIndex"
                v-model="editRow.comment"
              />
              <div v-else>
                {{ item.comment }}
              </div>
            </td>
            <td class="px-2 py-3">
              <div v-if="editingIndex === index" class="flex items-center">
                <svg
                  height="24"
                  version="1.1"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:cc="http://creativecommons.org/ns#"
                  xmlns:dc="http://purl.org/dc/elements/1.1/"
                  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  @click="addRowToStageArray"
                >
                  <g transform="translate(0 -1028.4)">
                    <path
                      d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                      fill="#27ae60"
                      transform="translate(0 1029.4)"
                    ></path>
                    <path
                      d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                      fill="#2ecc71"
                      transform="translate(0 1028.4)"
                    ></path>
                    <path
                      d="m16 1037.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z"
                      fill="#27ae60"
                    ></path>
                    <path
                      d="m16 1036.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z"
                      fill="#ecf0f1"
                    ></path>
                  </g>
                </svg>
                <XCircleIcon @click="onCancel" class="w-6 h-6 text-red-500" />
              </div>
              <div v-else class="flex items-center">
                <PencilSquareIcon
                  @click="EditRow(index)"
                  class="w-6 h-6 text-blue-500"
                /><TrashIcon
                  @click="deleteRow(index)"
                  class="w-6 h-6 text-red-500"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-full text-center">
      <button
        type="button"
        @click="addRow"
        class="my-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {{ !StageArray.length ? "Create New Table" : "Add Row" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon } from "@heroicons/vue/24/solid";
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import { XCircleIcon } from "@heroicons/vue/24/outline";

const StageArray = ref([]);
const freshRow = {
  workToBeDone: "",
  hoursLast3Months: "",
  hoursNext3Months: "",
  primaryStakeHolder: "",
  outcome: "",
  skillsRequired: "",
  workQuality: "",
  cabability: "",
  interest: "",
  interest: "",
  comment: "",
};
const cols = Object.keys(freshRow);
const editingIndex = ref(NaN);
const editRow = ref({ ...freshRow });
const tHeadArray = [
  "Work to be done",
  "Hours Last 3 Months",
  "Hours Next 3 Months",
  "Primary Stakeholder",
  "Outcome",
  "Skills Required",
  "Work Quality",
  "Capability",
  "	Interest",
  "Comment",
  "Action",
];

function EditRow(index) {
  if (!Object.keys(StageArray.value.at(-1)).length) {
    StageArray.value.pop();
  }
  editingIndex.value = index;
  editRow.value = { ...StageArray.value[index] };
}
function addRow() {
  if (!StageArray.value.length && isEmpty(editRow.value)) {
    editingIndex.value = 0;
    StageArray.value.push({});
    return;
  }
  if (!isEmpty(editRow.value)) {
    StageArray.value.splice(editingIndex.value, 1, { ...editRow.value });
    editRow.value = { ...freshRow };
    console.log(StageArray.value);
  } else {
    if (!Object.keys(StageArray.value.at(-1)).length) {
      StageArray.value.pop();
    }
  }
  editingIndex.value = StageArray.value.length;
  StageArray.value.push({});
}
function addRowToStageArray() {
  if (isEmpty(editRow.value)) {
    StageArray.value.pop();
    return;
  }
  StageArray.value.splice(editingIndex.value, 1, { ...editRow.value });
  editRow.value = { ...freshRow };
  editingIndex.value = NaN;
}
function deleteRow(index) {
  StageArray.value.splice(index, 1);
  if(editingIndex.value!==NaN){
    editingIndex.value--
  }
  
}
function onCancel() {
  if(!Object.keys(StageArray.value.at(-1)).length){
    StageArray.value.pop();
    editRow.value = { ...freshRow };
  }
  editingIndex.value=NaN
}
function isEmpty(value) {
  return Object.values(value).join("").length ? false : true;
}
</script>

<style lang="scss" scoped></style>
