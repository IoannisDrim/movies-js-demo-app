import {InfiniteScrollUtil} from '../index';

describe('InfiniteScrollUtil', () => {
  const parentId = 'test';

  const renderScrollContainer = () => {
    const scrollContainer = document.createElement('div');
    scrollContainer.scrollTop = 0;
    document.body.appendChild(scrollContainer);
    return scrollContainer;
  };

  it('should fire event when scrolling near to the end of scrolling container', () => {
    const scrollContainer = renderScrollContainer();

    jest.spyOn(scrollContainer, 'clientHeight', 'get').mockReturnValue(100);
    jest.spyOn(scrollContainer, 'scrollHeight', 'get').mockReturnValue(1000);

    const fetchScrollContainerData = jest.fn();
    document.addEventListener(`fetchScrollContainerData_${parentId}`, fetchScrollContainerData);

    new InfiniteScrollUtil(parentId, scrollContainer);

    scrollContainer.scrollTop = 900;
    scrollContainer.dispatchEvent(new Event('scroll'));

    expect(fetchScrollContainerData).toHaveBeenCalled();
    document.body.removeChild(scrollContainer);
    document.removeEventListener(`fetchScrollContainerData_${parentId}`, fetchScrollContainerData);
  });

  it('should not fire event when scrolling far from the end of scrolling container', () => {
    const scrollContainer = renderScrollContainer();

    jest.spyOn(scrollContainer, 'clientHeight', 'get').mockReturnValue(100);
    jest.spyOn(scrollContainer, 'scrollHeight', 'get').mockReturnValue(1000);

    const fetchScrollContainerData = jest.fn();
    document.addEventListener(`fetchScrollContainerData_${parentId}`, fetchScrollContainerData);

    new InfiniteScrollUtil(parentId, scrollContainer);

    scrollContainer.scrollTop = 10;
    scrollContainer.dispatchEvent(new Event('scroll'));

    expect(fetchScrollContainerData).not.toHaveBeenCalled();
    document.body.removeChild(scrollContainer);
    document.removeEventListener(`fetchScrollContainerData_${parentId}`, fetchScrollContainerData);
  });
});
