import { LoadCards } from './CropController.js';
import {LoadFieldCard} from './FieldController.js';
import {LoadAllVehicleDetails} from './VehicleController.js';
import {LoadAllEquipment} from './EquipmentController.js';
import {LoadAllStaffMember} from './StaffController.js';
import {LoadAllLogs} from "./MonitoringLogController.js";

$('#signInAndSignUp-sec').css({display: 'block'})
$('#header-sec').css({display:'none'});
$('#dashboard-sec').css({display:'none'});
$('#field-sec').css({display:'none'});
$('#crops-sec').css({display:'none'});
$('#staff-sec').css({display:'none'});
$('#monitoring-log-sec').css({display:'none'});
$('#vehicle-sec').css({display:'none'});
$('#equipment-sec').css({display:'none'});
$('#sections-wrapper').css({display:'none'});

const loadFieldCard = new LoadFieldCard();
const loadCropCard = new LoadCards();
const allStaffMember = new LoadAllStaffMember();
const loadAllEquipment = new LoadAllEquipment();
const loadAllLogs = new LoadAllLogs();
allStaffMember.loadAllMembers();
loadFieldCard.loadAllFieldCard();
loadCropCard.loadAllCropCard();
loadAllEquipment.loadAllEquDetails();
loadAllLogs.loadAllLogsDetails();

$('#btn-signIn').on('click',function (){
    $('#sections-wrapper').css({display:'block'});
    $('#header-sec').css({display: 'block'});
    $('#dashboard-sec').css({display:'block'});
    $('#signInAndSignUp-sec').css({display: 'none'});
    $('#field-sec').css({display:'none'});
    $('#crops-sec').css({display:'none'});
    $('#staff-sec').css({display:'none'});
    $('#monitoring-log-sec').css({display:'none'});
    $('#vehicle-sec').css({display:'none'});
    $('#equipment-sec').css({display:'none'});
});

$('#btn-logout').on('click',function (){
    $('#signInAndSignUp-sec').css({display:'block'})
    $('#sections-wrapper').css({display:'none'});
    $('#header-sec').css({display:'none'});
    $('#dashboard-sec').css({display:'none'});
    $('#field-sec').css({display:'none'});
    $('#crops-sec').css({display:'none'});
    $('#staff-sec').css({display:'none'});
    $('#monitoring-log-sec').css({display:'none'});
    $('#vehicle-sec').css({display:'none'});
    $('#equipment-sec').css({display:'none'});
});

$('#dashboard').on('click',function (){
    $('#main-label').text('Dashboard');
    $('#dashboard-sec').css({display:'block'});
    $('#field-sec').css({display:'none'});
    $('#crops-sec').css({display:'none'});
    $('#staff-sec').css({display:'none'});
    $('#monitoring-log-sec').css({display:'none'});
    $('#vehicle-sec').css({display:'none'});
    $('#equipment-sec').css({display:'none'});
});

$('#field').on('click',function (){
    loadFieldCard.loadAllFieldCard();
    $('#main-label').text('Field Manage');
    $('#field-sec').css({display:'block'});
    $('#dashboard-sec').css({display:'none'});
    $('#crops-sec').css({display:'none'});
    $('#staff-sec').css({display:'none'});
    $('#monitoring-log-sec').css({display:'none'});
    $('#vehicle-sec').css({display:'none'});
    $('#equipment-sec').css({display:'none'});
});

$('#crops').on('click',function (){
    loadCropCard.loadAllCropCard();
    $('#main-label').text('Crop Manage');
    $('#crops-sec').css({display:'block'});
    $('#dashboard-sec').css({display:'none'});
    $('#field-sec').css({display:'none'});
    $('#staff-sec').css({display:'none'});
    $('#monitoring-log-sec').css({display:'none'});
    $('#vehicle-sec').css({display:'none'});
    $('#equipment-sec').css({display:'none'});
});

$('#staff').on('click',function (){
    allStaffMember.loadAllMembers();
    $('#main-label').text('Staff Manage');
    $('#staff-sec').css({display:'block'});
    $('#dashboard-sec').css({display:'none'});
    $('#field-sec').css({display:'none'});
    $('#crops-sec').css({display:'none'});
    $('#monitoring-log-sec').css({display:'none'});
    $('#vehicle-sec').css({display:'none'});
    $('#equipment-sec').css({display:'none'});
});

$('#log').on('click',function (){
    loadAllLogs.loadAllLogsDetails();
    $('#main-label').text('Logs Services');
    $('#monitoring-log-sec').css({display:'block'});
    $('#dashboard-sec').css({display:'none'});
    $('#field-sec').css({display:'none'});
    $('#crops-sec').css({display:'none'});
    $('#staff-sec').css({display:'none'});
    $('#vehicle-sec').css({display:'none'});
    $('#equipment-sec').css({display:'none'});
});

$('#vehicle').on('click',function (){
    const loadAllVehicle = new LoadAllVehicleDetails();
    loadAllVehicle.loadVehicleTable();
    $('#main-label').text('Vehicle Manage');
    $('#vehicle-sec').css({display:'block'});
    $('#dashboard-sec').css({display:'none'});
    $('#field-sec').css({display:'none'});
    $('#crops-sec').css({display:'none'});
    $('#staff-sec').css({display:'none'});
    $('#monitoring-log-sec').css({display:'none'})
    $('#equipment-sec').css({display:'none'});
});

$('#equipment').on('click',function (){
    loadAllEquipment.loadAllEquDetails();
    $('#main-label').text('Equipment Manage');
    $('#equipment-sec').css({display:'block'});
    $('#dashboard-sec').css({display:'none'});
    $('#field-sec').css({display:'none'});
    $('#crops-sec').css({display:'none'});
    $('#staff-sec').css({display:'none'});
    $('#monitoring-log-sec').css({display:'none'});
    $('#vehicle-sec').css({display:'none'});
});

