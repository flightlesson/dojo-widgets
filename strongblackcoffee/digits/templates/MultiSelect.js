<table>
  <tr>
    <td align="center">
      <label for="${name}-clist">${candidatesLabel}</label><br/>
      <select multiple='true' size='7' name="${name}-clist" data-dojo-attach-point="initialcandidatelist"></select>
    </td>
    <td>
      <button data-dojo-attach-event="onclick: chosenAdd" type="button">&lt;</button>
      <button data-dojo-attach-event="onclick: chosenRemove" type="button">&gt;</button>
    </td>
    <td align="center">
      <label for="${name}-slist">selected</label><br/>
      <select multiple='true' size='7' name="${name}-slist"></select>
    </td>
  </tr>
</table>









